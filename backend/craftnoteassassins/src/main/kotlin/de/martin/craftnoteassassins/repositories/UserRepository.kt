package de.martin.craftnoteassassins.repositories

import de.martin.craftnoteassassins.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import javax.transaction.Transactional

@Transactional(Transactional.TxType.MANDATORY) interface UserRepository : JpaRepository<User, Long>{
    fun findByUsername(username : String) : List<User>
    fun findById(id : Int) : List<User>
}