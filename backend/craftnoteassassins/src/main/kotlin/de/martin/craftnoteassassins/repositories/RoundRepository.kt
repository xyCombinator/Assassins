package de.martin.craftnoteassassins.repositories

import de.martin.craftnoteassassins.entities.Circle
import de.martin.craftnoteassassins.entities.Round
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Transactional

@Transactional(readOnly = false)
interface RoundRepository : JpaRepository<Round, Long> {
    fun findByCircleOrderByRoundNumber(circle: Circle): List<Round>
    fun findByCircleAndRoundNumber(circle: Circle, roundNumber : Int): List<Round>

}
