package de.martin.craftnoteassassins.entities

import javax.persistence.*

@Entity
data class Circle(
        val name: String,

        @ManyToOne var owner: User,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null
) {
    @OneToMany(mappedBy = "circle")
    var users: MutableList<UserCircleRelation> = mutableListOf()

}