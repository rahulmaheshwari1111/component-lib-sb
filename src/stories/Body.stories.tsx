import React from "react";
import { Story } from "@storybook/react";
import { Body, IBodyProps } from "../components/Body";


export default {
  title: "Body",
  component: Body,
};

const Template: Story<IBodyProps> = args => <Body {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  values:'Your Text here....'
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   children: "Secondary",
//   variant: "secondary",
// };

// export const Danger = Template.bind({})

// Danger.args = {
//     children: "Danger",
//     variant: "danger",
//   };
//   export const Outline = Template.bind({})

// Outline.args = {
//     children: "Outline",
//     variant: "outline",
//   };