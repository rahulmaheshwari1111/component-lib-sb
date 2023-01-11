import React from "react";
import { Story } from "@storybook/react";
import { CheckBox, ICheckBoxButton } from ".";


export default {
  title: "CheckBox",
  component: CheckBox,
};

const Template: Story<ICheckBoxButton> = args => <CheckBox {...args} />;

export const Checkbox = Template.bind({});
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