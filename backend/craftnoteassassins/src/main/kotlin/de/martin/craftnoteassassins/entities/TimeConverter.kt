import java.sql.Timestamp
import java.time.LocalDateTime
import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter(autoApply = true)
class LocalDateAttributeConverter : AttributeConverter<LocalDateTime, Timestamp> {

    override fun convertToDatabaseColumn(locDate: LocalDateTime?): Timestamp? {
        return if (locDate != null) Timestamp.valueOf(locDate) else null
    }

    override fun convertToEntityAttribute(sqlDate: Timestamp?): LocalDateTime? {
        return sqlDate?.toLocalDateTime()
    }
}