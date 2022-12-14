import React from "react";
import { Story } from "@storybook/react";
import { TimePicker, TimePickerProps } from "../components/TimePicker";


export default {
  title: "TimePicker",
  component: TimePicker,
};

const Template: Story<TimePickerProps> = args => <TimePicker {...args} />;

export const Example = Template.bind({});
Example.args = {
    name:"startTime",
    timeValue:'11:11',
    maxTime:"23:58",
};

