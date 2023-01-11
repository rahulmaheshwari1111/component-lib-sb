import React from "react";
import { Story } from "@storybook/react";
import { BarChart, IBarProps } from ".";


export default {
  title: "BarChart",
  component: BarChart,
};

const Template: Story<IBarProps> = args => <BarChart {...args} />;

export const Example = Template.bind({});
Example.args = {
  data: [
    { xValue: "Item1", yValue: 130 },
    { xValue: "Item2", yValue: 80 },
    { xValue: "Item3", yValue: 30 },
  ],
};
