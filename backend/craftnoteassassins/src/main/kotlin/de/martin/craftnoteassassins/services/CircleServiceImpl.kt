package de.martin.craftnoteassassins.services

import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.entities.Circle
import de.martin.craftnoteassassins.entities.Relation
import de.martin.craftnoteassassins.entities.Round
import de.martin.craftnoteassassins.repositories.CircleRepository
import de.martin.craftnoteassassins.repositories.RoundRepository
import de.martin.craftnoteassassins.repositories.UserCircleRepository
import de.martin.craftnoteassassins.repositories.UserRepository
import de.martin.craftnoteassassins.repositories.UserRoundRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.lang.RuntimeException

@Repository
@Transactional(readOnly = false)
class CircleServiceImpl : CircleService {

    @Autowired
    lateinit var circleRepository: CircleRepository

    @Autowired
    lateinit var userRepository: UserRepository


    @Autowired
    lateinit var userCircleRepository: UserCircleRepository

    @Autowired
    lateinit var roundRepository: RoundRepository

    @Autowired
    lateinit var userRoundRepository: UserRoundRepository


    override fun activateCircle(circleName: String) {
        val circle = circleRepository.findByName(circleName).firstOrNull()
        circle ?: return
        if (circle.users.size < 3) {
            return
        }
        val activeRound = getActiveRoundOfCircle(circle)
        if (activeRound != null) {
            throw RuntimeException("circle already active")
        }
        val roundNumber = roundRepository.findByCircleOrderByRoundNumber(circle).size + 1
        val newRound = Round(circle, roundNumber)
        roundRepository.save(newRound)
        val randomRanks = createPermutatedRankList(circle.users.size)
        val newUserRoundRelations = circle.users.map { it.user }.mapIndexed { index, user -> Relation(user, newRound, randomRanks[index], -1) }
        newUserRoundRelations.forEach { userRoundRepository.save(it) }
    }

    override fun findUsersOfCircle(circleName: String): List<UserDTO> {
        val circle = circleRepository.findByName(circleName)[0]
        return userCircleRepository.findByCircle(circle).map { relation -> relation.user }.map { user -> UserDTO(user.username, user.password) }
    }

    override fun findCirclesOfUser(username: String): List<Circle> {
        val foundUsers = userRepository.findByUsername(username)
        if (foundUsers.isEmpty()) {
            return emptyList()
        }
        val user = foundUsers[0]
        val foundRels = userCircleRepository.findByUser(user)
        return foundRels.map { it.circle }
    }

    override fun findCircle(circleName: String): Circle? {
        val foundCircles = circleRepository.findByName(circleName)
        return foundCircles.firstOrNull()
    }


    override fun createCircle(circleName: String, user: String) {
        val circle = circleRepository.findByName(circleName)
        val user = userRepository.findByUsername(user)

        if (!circle.isEmpty() || user.isEmpty()) {
            return
        }
        val newCircle = Circle(circleName, user[0])
        circleRepository.save(newCircle)
    }

    override fun isUserAliveInCircle(username: String, circleName: String): Boolean {
        val foundUsers = userRepository.findByUsername(username)
        if (foundUsers.isEmpty()) {
            return false
        }
        val circle = circleRepository.findByName(circleName).lastOrNull()
        circle ?: return false
        val activeRound = getActiveRoundOfCircle(circle)
        activeRound ?: return false
        return !userRoundRepository.findByRound(activeRound).filter { it.eliminated == null }.filter { it.user.username == username }.isEmpty()
    }



    private fun getActiveRoundOfCircle(circle: Circle): Round? {
        val rounds = roundRepository.findByCircleOrderByRoundNumber(circle)
        val highestRound = rounds.sortedWith(compareBy(Round::roundNumber)).lastOrNull()
        highestRound ?: return null
        val highestRoundIsActive = userRoundRepository.findByRound(highestRound).filter { it.eliminated == -1 }.size > 1
        if (!highestRoundIsActive) {
            return null
        }
        return highestRound
    }

    override fun findActiveRoundForCircle(circleName: String): Round? {
        val circle = circleRepository.findByName(circleName).firstOrNull()
        circle ?: return null
        return getActiveRoundOfCircle(circle)
    }

    private fun createPermutatedRankList(n: Int): List<Int> {
        val range = (0..(n - 1))
        return range.shuffled()
    }
}