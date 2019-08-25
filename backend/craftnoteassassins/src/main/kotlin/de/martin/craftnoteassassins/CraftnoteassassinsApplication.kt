package de.martin.craftnoteassassins

import de.martin.craftnoteassassins.dtos.UserDTO
import de.martin.craftnoteassassins.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication
class CraftnoteassassinsApplication

@Autowired
lateinit var userService: UserService

fun main(args: Array<String>) {
    runApplication<CraftnoteassassinsApplication>(*args) {
        setBannerMode(Banner.Mode.OFF)
        //setupData()
    }
}

private fun setupData() {
    val martin = UserDTO("martin", "martin")
    val klaus = UserDTO("klaus", "klaus")
    val ulla = UserDTO("ulla", "ulla")

    userService.registerUser(martin)
    userService.registerUser(klaus)
    userService.registerUser(ulla)
}

