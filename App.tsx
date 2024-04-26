import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function App() {
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  const handlePreviousMonth = useCallback(() => {
    const newDate = dayjs(currentCalendarMonth).subtract(1, "month").toDate();

    setCurrentCalendarMonth(newDate);
  }, [currentCalendarMonth]);

  const handleMonthYearChange = useCallback(
    (month: number, year: number) => {
      let newDate = dayjs(currentCalendarMonth)
        .set("month", month)
        .set("year", year)
        .toDate();
      setCurrentCalendarMonth(newDate);
    },
    [currentCalendarMonth]
  );

  return (
    <View style={styles.container}>
      <Calendar
        calendarMonthId={toDateId(currentCalendarMonth)}
        getCalendarWeekDayFormat={(date) => dayjs(date).format("ddd")}
        onCalendarDayPress={(dateId) => {
          console.log(`Clicked on ${dateId}`);
        }}
      />
      <Button
        title="Set Year to 2020"
        onPress={() => {
          handleMonthYearChange(dayjs(currentCalendarMonth).month(), 2020);
        }}
      />
      <Button title="Reduce Month by 1" onPress={handlePreviousMonth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 200,
  },
});
