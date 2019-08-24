package de.martin.craftnoteassassins.entities

import javax.persistence.*


@Entity
data class Relation(
        @ManyToOne
        @JoinColumn(name = "userid")
        val user: User,

        @ManyToOne
        @JoinColumn(name = "roundid")
        val round: Round,

        var rank2: Int,
        var eliminated: Int,

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Int? = null
)