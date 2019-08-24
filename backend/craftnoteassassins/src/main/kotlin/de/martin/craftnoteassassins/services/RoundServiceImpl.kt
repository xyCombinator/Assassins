package de.martin.craftnoteassassins.services

import de.martin.craftnoteassassins.entities.User
import de.martin.craftnoteassassins.repositories.CircleRepository
import de.martin.craftnoteassassins.repositories.RoundRepository
import de.martin.craftnoteassassins.repositories.UserRepository
import de.martin.craftnoteassassins.repositories.UserRoundRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
@Transactional(readOnly = false)
class RoundServiceImpl : RoundService {

    @Autowired
    lateinit var roundRepository: RoundRepository

    @Autowired
    lateinit var circleRepository: CircleRepository

    @Autowired
    lateinit var userRepository: UserRepository
    @Autowired
    lateinit var userRoundRepository: UserRoundRepository

    override fun isUserHasWonRound(userName : String, circleName: String, roundNumber : Int): Boolean {
        val user = userRepository.findByUsername(userName)
        if(user.isEmpty()){
            return false;
        }
        val circle = circleRepository.findByName(circleName)
        if(circle.isEmpty()){
            return false;
        }
        val round = roundRepository.findByCircleAndRoundNumber(circle[0], roundNumber)
        if(!round.flatMap{ it.relations }.map { it.user }.any { it.username ==(userName)}){
            return false
        }
        val relations = userRoundRepository.findByRound(round.first())
        val alivePlayers = relations.filter { it.eliminated == -1 }
        if(alivePlayers.size == 1 && alivePlayers.map { it.user }.contains(user[0])){
            return true
        }

        return false
    }
}