package de.martin.craftnoteassassins

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import org.springframework.transaction.annotation.EnableTransactionManagement

@Configuration
@PropertySource("classpath:application-test.properties")
@EnableTransactionManagement
class TestDatabaseConfiguration {
}