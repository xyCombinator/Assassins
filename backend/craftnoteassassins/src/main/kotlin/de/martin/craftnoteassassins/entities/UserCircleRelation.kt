package de.martin.craftnoteassassins.entities

import javax.persistence.*

@Entity
@Table(name = "user_circle")
data class UserCircleRelation(

        @ManyToOne
        @JoinColumn(name = "user_id")
        val user: User,

        @ManyToOne
        @JoinColumn(name = "circle_id")
        val circle: Circle,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null
)