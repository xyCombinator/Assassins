package de.martin.craftnoteassassins.repositories

import de.martin.craftnoteassassins.entities.Relation
import de.martin.craftnoteassassins.entities.Round
import de.martin.craftnoteassassins.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import javax.transaction.Transactional

@Transactional(Transactional.TxType.MANDATORY) interface UserRoundRepository : JpaRepository<Relation, Long> {
    fun findByRound(round: Round) : List<Relation>
    fun findByUser(user: User) : List<Relation>

}