package de.martin.craftnoteassassins.entities

import javax.persistence.*

@Entity
data class Round(@ManyToOne val circle: Circle, val roundNumber: Int, @Id
@GeneratedValue(strategy = GenerationType.AUTO)
var id: Int? = null

){
    @OneToMany(mappedBy = "round")
    var relations: MutableList<Relation> = mutableListOf()

}