package de.martin.craftnoteassassins.entities

import javax.persistence.*

@Entity
data class User(@Column(nullable = false)
                val username: String, @Column(nullable = false)
                val password: String,

                @Id
                @GeneratedValue(strategy = GenerationType.IDENTITY)
                var id: Int? = null

) {
    @OneToMany(mappedBy = "user")
    var circles: MutableList<UserCircleRelation> = mutableListOf()
}