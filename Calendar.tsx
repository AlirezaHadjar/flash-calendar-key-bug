import type {
  CalendarProps,
  CalendarTheme,
} from "@marceloterreiro/flash-calendar";
import { Calendar, useCalendar } from "@marceloterreiro/flash-calendar";
import React, { memo, useMemo } from "react";
import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import dayjs from "dayjs";

const DAY_HEIGHT = 40;
const WEEK_DAYS_HEIGHT = 36;

interface MCalendarProps extends CalendarProps {
  onPreviousMonthPress: () => void;
  onNextMonthPress: () => void;
  onMonthYearChange: (month: number, year: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  currentCalendarMonth: Date;
}
export const MCalendar = memo((props: MCalendarProps) => {
  const { calendarRowMonth, weekDaysList, weeksList } = useCalendar({
    getCalendarWeekDayFormat: (date) => dayjs(date).format("ddd").toUpperCase(),
    ...props,
  });

  return (
    <View style={props.containerStyle}>
      <Calendar.VStack spacing={props.calendarRowVerticalSpacing}>
        <Calendar.HStack
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <TouchableOpacity hitSlop={20} onPress={props.onPreviousMonthPress}>
            <View style={styles.circle} />
          </TouchableOpacity>
          <Text>{calendarRowMonth}</Text>
          <TouchableOpacity hitSlop={20} onPress={props.onNextMonthPress}>
            <View style={styles.circle} />
          </TouchableOpacity>
        </Calendar.HStack>

        <View>
          <Calendar.Row.Week spacing={4}>
            {weekDaysList.map((week, i) => (
              <Calendar.Item.WeekName height={WEEK_DAYS_HEIGHT} key={i}>
                {week}
              </Calendar.Item.WeekName>
            ))}
          </Calendar.Row.Week>

          <Calendar.VStack spacing={10}>
            {weeksList.map((week, i) => (
              <Calendar.Row.Week key={i}>
                {week.map((day) => (
                  <Calendar.Item.Day.Container
                    dayHeight={DAY_HEIGHT}
                    daySpacing={4}
                    isStartOfWeek={day.isStartOfWeek}
                    key={day.id}
                  >
                    <Calendar.Item.Day
                      height={DAY_HEIGHT}
                      metadata={day}
                      onPress={props.onCalendarDayPress}
                    >
                      {day.displayLabel}
                    </Calendar.Item.Day>
                  </Calendar.Item.Day.Container>
                ))}
              </Calendar.Row.Week>
            ))}
          </Calendar.VStack>
        </View>

        <Button
          title="Set Date to 2020"
          onPress={() => {
            props.onMonthYearChange(
              dayjs(props.currentCalendarMonth).month(),
              2020
            );
          }}
        />
      </Calendar.VStack>
    </View>
  );
});

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});
