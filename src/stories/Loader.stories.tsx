import React from "react";
import { Story } from "@storybook/react";
import { Loader, ILoaderProps} from "../components/Loader";



export default {
  title: "Loader",
  component: Loader,
};

const Template: Story<ILoaderProps> = args => <Loader {...args} />;

export const basic = Template.bind({});
basic.args = {
  content:'iecho.org',


};

