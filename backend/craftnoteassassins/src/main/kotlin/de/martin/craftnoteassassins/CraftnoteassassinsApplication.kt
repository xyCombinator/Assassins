package de.martin.craftnoteassassins

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication
class CraftnoteassassinsApplication

fun main(args: Array<String>) {
    runApplication<CraftnoteassassinsApplication>(*args) {
        setBannerMode(Banner.Mode.OFF)
    }
}
