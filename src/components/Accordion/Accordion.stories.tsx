import React from "react";
import { Story } from "@storybook/react";
import { Accordion, IAccordion } from ".";


export default {
  title: "Accordion",
  component: Accordion,
};

const Template: Story<IAccordion> = args => <Accordion {...args} />;

export const Example = Template.bind({});
Example.args = {
  title:'Your Text here....'
};
