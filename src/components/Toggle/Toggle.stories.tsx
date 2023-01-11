import React from "react";
import { Story } from "@storybook/react";
import { Toggle, IToggleButton } from ".";


export default {
  title: "Toggle",
  component: Toggle,
};

const Template: Story<IToggleButton> = args => <Toggle {...args} />;

export const basic = Template.bind({});
basic.args = {
  name:'Toggle'

};

