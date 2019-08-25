package de.martin.craftnoteassassins.services

import de.martin.craftnoteassassins.dtos.CircleDTO
import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.entities.Circle
import de.martin.craftnoteassassins.entities.Round


interface CircleService {
    fun createCircle(circleName: String, owner: String)
    fun activateCircle(circleName: String)
    fun findUsersOfCircle(circleName: String): List<UserDTO>
    fun findCirclesOfUser(username: String): List<Circle>
    fun findCircle(circleName: String): Circle?
    fun findAllCircles(): List<CircleDTO>
    fun isUserAliveInCircle(username: String, circleName: String): Boolean
    fun findActiveRoundForCircle(circleName: String): Round?
}