package de.martin.craftnoteassassins.repositories

import de.martin.craftnoteassassins.entities.Circle
import de.martin.craftnoteassassins.entities.User
import de.martin.craftnoteassassins.entities.UserCircleRelation
import org.springframework.data.jpa.repository.JpaRepository
import javax.transaction.Transactional

@Transactional(Transactional.TxType.MANDATORY) interface UserCircleRepository : JpaRepository<UserCircleRelation, Long> {
    fun findByCircle(circle: Circle) : List<UserCircleRelation>
    fun findByUser(user: User) : List<UserCircleRelation>

}