import React from "react";
import { Story } from "@storybook/react";
import { Tooltip, ITooltip } from ".";



export default {
  title: "Tooltip",
  component: Tooltip,
};

const Template: Story<ITooltip> = args => <Tooltip {...args} />;

export const basic = Template.bind({});
basic.args = {
  position:'top',
  content:'Your tooltip text here',
  children:<h1>Hover over me to see the tooltip.</h1>

};

