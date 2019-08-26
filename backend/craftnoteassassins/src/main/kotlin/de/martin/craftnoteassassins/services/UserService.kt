package de.martin.craftnoteassassins.services

import de.martin.craftnoteassassins.dtos.*
import de.martin.craftnoteassassins.entities.User
import de.martin.craftnoteassassins.entities.UserCircleRelation
import de.martin.craftnoteassassins.repositories.CircleRepository
import de.martin.craftnoteassassins.repositories.UserCircleRepository
import de.martin.craftnoteassassins.repositories.UserRepository
import de.martin.craftnoteassassins.repositories.UserRoundRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.RuntimeException
import java.time.LocalDateTime

interface UserService {
    fun save(user: User)
    fun findByUsername(username: String): UserDTO?
    fun findByUsernameForPrincipal(username: String): UserDTO?
    fun registerUser(userDto: UserDTO)
    fun joinCircle(username: String, circleName: String)
    fun findNextVictim(username: String, circlename: String): UserDTO?
    fun killVictim(username: String, circlename: String)
    fun getUserInformation(username: String): PlayerDTO
}

@Service
@Transactional
class UserServiceImpl @Autowired constructor(private val repository: UserRepository, private val circleRepository: CircleRepository, private val userCircleRepository: UserCircleRepository, private val userRoundRepository: UserRoundRepository, private val circleService: CircleService) : UserService {
    override fun save(customer: User) {
        repository.save(customer)
        repository.count()
        repository.count()
    }

    override fun findByUsername(username: String): UserDTO? {
        val user = findByUsernameInt(username).firstOrNull()
        if (user === null) {
            return null
        }
        var circles: MutableList<CircleDTO> = arrayListOf()
        for(circleInp in user.circles){
            val circle = CircleDTO(circleInp.circle.name, UserDTO(circleInp.circle.owner.username, null))
            circle.players = circleInp.circle.users.map{UserDTO(it.user.username, null)}.toMutableList()
            circles.add(circle)
        }
        val rounds = userRoundRepository.findByUser(user).map { it.round }
        val roundDtos: List<RoundDTO> = rounds.map {
            val n = it.roundNumber
            val alivePlayers = it.relations.filter { it.eliminated == -1 }.map { UserDTO(it.user.username, null) }
            val deadPlayers = it.relations.filter { it.eliminated != -1 }.map { UserDTO(it.user.username, null) }

            val round = RoundDTO(n, it.circle.name, alivePlayers, deadPlayers, it.endTime)
            if (alivePlayers.size > 1) {
                val nextVictim = findNextVictim(user.username, it.circle.name)
                round.nextVictim = nextVictim
            }
            round
        }

        roundDtos.forEach {
            val circleName = it.circleName
            val circle = circles.firstOrNull { it.name === circleName }
            if (circle !== null) {
                circle.rounds.add(it)
            }
        }

        val userDTO = UserDTO(username, null)
        userDTO.circles = circles
        return userDTO
    }

    override fun findByUsernameForPrincipal(username: String): UserDTO? {
        return findByUsernameInt(username).map { UserDTO(it.username, it.password) }.firstOrNull()
    }

    private fun findByUsernameInt(username: String): List<User> {
        return repository.findByUsername(username)
    }

    override fun joinCircle(username: String, circlename: String) {
        val foundCircle = circleRepository.findByName(circlename).firstOrNull()
        val foundUser = repository.findByUsername(username).firstOrNull()
        foundCircle ?: return
        foundUser ?: return

        val relation = UserCircleRelation(foundUser, foundCircle)
        userCircleRepository.save(relation)
    }

    override fun registerUser(userDto: UserDTO) {
        val foundUsers = repository.findByUsername(userDto.name)
        if (!foundUsers.isEmpty()) {
            throw RuntimeException("User already exists")
        }
        val encryptedPassword = BCryptPasswordEncoder(4).encode(userDto.password)
        val user = User(userDto.name, encryptedPassword)
        save(user)
    }

    override fun findNextVictim(username: String, circlename: String): UserDTO? {
        val user = findByUsernameInt(username).firstOrNull()
        user ?: return null
        val activeRound = circleService.findActiveRoundForCircle(circlename)
        activeRound ?: return null
        val relsOfRound = userRoundRepository.findByRound(activeRound).filter { it.eliminated == -1 }.sortedBy { it.userRank }
        if (relsOfRound.size < 2) {
            return null
        }
        val userRel = relsOfRound.filter { it.user.username == username }.firstOrNull()
        userRel ?: return null
        val nextUser = relsOfRound[((relsOfRound.indexOf(userRel)) + 1) % relsOfRound.size].user
        return UserDTO(nextUser.username, null)
    }

    override fun killVictim(username: String, circlename: String) {
        val nextVictim = findNextVictim(username, circlename)
        nextVictim ?: return
        val activeRound = circleService.findActiveRoundForCircle(circlename)
        activeRound ?: return
        val allPlayersInRound = userRoundRepository.findByRound(activeRound)
        val alivePlayersInRound = allPlayersInRound.filter { it.eliminated == -1 }
        val victimRel = alivePlayersInRound.filter { it.user.username == nextVictim.name }.firstOrNull()
        victimRel ?: return
        victimRel.eliminated = allPlayersInRound.size - alivePlayersInRound.size

        //if only two alive players were left then the round ends with this assassination
        if(alivePlayersInRound.size == 2){
            activeRound.endTime = LocalDateTime.now()
        }
    }

    override fun getUserInformation(username: String): PlayerDTO {
        val user = findByUsername(username)
        if (user === null) {
            throw RuntimeException("User not found")
        }
        val circlesOfUser = circleService.findCirclesOfUser(username)
        val circleParticipations = mutableListOf<CircleParticipationDTO>()
        for (circle in circlesOfUser) {
            val circleDTO = CircleDTO(circle.name, UserDTO(circle.owner.username, null))
            val nextVictim = findNextVictim(username, circle.name)
            val isAliveInCircle = circleService.isUserAliveInCircle(username, circle.name)
            val circleParticipationDTO = CircleParticipationDTO(circleDTO, nextVictim, isAliveInCircle)
            circleParticipations.add(circleParticipationDTO)
        }
        val userDTO = UserDTO(user.name, user.password)
        return PlayerDTO(userDTO, circleParticipations)

    }

    private fun findCircleRelsForUser(username: String, circlename: String): List<UserCircleRelation> {
        val user = findByUsernameInt(username)
        if (user.isEmpty()) {
            return emptyList()
        }
        val relsOfUser = userCircleRepository.findByUser(user[0])
        val circle = relsOfUser.filter { it.circle.name == circlename }.map { it.circle }
        if (circle.isEmpty()) {
            return emptyList()
        }
        return userCircleRepository.findByCircle(circle[0])

    }
}