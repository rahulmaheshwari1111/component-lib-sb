import React from "react";
import { Story } from "@storybook/react";
import { CountDown, ICountDown } from "../components/Countdown";


export default {
  title: "Countdown",
  component: CountDown,
};

const Template: Story<ICountDown> = args => <CountDown {...args} />;

export const Countdown = Template.bind({});
// Primary.args = {
//   children: "Primary",
//   variant: "primary",
// };

// export const Danger = Template.bind({});
// Danger.args = {
//   children: "Danger",
//   variant: "danger",
//   shape: "rounded",
// };



// Primary.args = {
//     children: "Primary",
//     variant: "primary",
//   };