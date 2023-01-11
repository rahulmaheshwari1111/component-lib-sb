import React from "react";
import { Story } from "@storybook/react";
import { Chip, IChipProps } from ".";


export default {
  title: "Chip",
  component: Chip,
};

const Template: Story<IChipProps> = args => <Chip {...args} />;

export const basic = Template.bind({});
basic.args = {
    chipText: 'Your Text here..'
};

