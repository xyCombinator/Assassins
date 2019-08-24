package de.martin.craftnoteassassins.repositories

import de.martin.craftnoteassassins.entities.Circle
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Transactional(readOnly = false) interface CircleRepository : JpaRepository<Circle, Long> {

    @Transactional(propagation = Propagation.REQUIRED)
    fun findByName(name: String) : List<Circle>
    fun findById(id : Int) : List<Circle>
}