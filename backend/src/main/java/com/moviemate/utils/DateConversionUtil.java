package com.moviemate.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateConversionUtil {

    public static String convertDate(String inputDate) {

        // Define the input and output date formats
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("MMM d, yyyy");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            // Parse the input date string
            LocalDate date = LocalDate.parse(inputDate, inputFormatter);

            // Format the date into the desired output format
            return date.format(outputFormatter);
        } catch (DateTimeParseException e) {
            // Handle the exception if the input date string is not in the expected format
            System.err.println("Invalid date format: " + inputDate);
            return null;
        }
    }
}