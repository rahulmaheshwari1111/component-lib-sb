import React from "react";
import { Story } from "@storybook/react";
import { Button, IButtonProps } from ".";


export default {
  title: "Button",
  component: Button,
};

const Template: Story<IButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Button Text Here",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  variant: "secondary",
};

export const Danger = Template.bind({})

Danger.args = {
    children: "Danger",
    variant: "danger",
  };
  export const Outline = Template.bind({})

Outline.args = {
    children: "Outline",
    variant: "outline",
  };