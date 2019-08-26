package de.martin.craftnoteassassins.entities

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Round(@ManyToOne val circle: Circle, val roundNumber: Int, @Id
@GeneratedValue(strategy = GenerationType.AUTO)
var id: Int? = null

) {
    @OneToMany(mappedBy = "round")
    var relations: MutableList<Relation> = mutableListOf()

    var endTime: LocalDateTime? = null

}