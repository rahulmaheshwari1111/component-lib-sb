import React from "react";
import { Story } from "@storybook/react";
import { Avatar, IAvatarProps } from ".";


export default {
  title: "Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'This component is used to display profile picture. If you provide the url the respective image will be displayed else user name initials will be displayed.',
      },
    },
  },
};

const Template: Story<IAvatarProps> = args => <Avatar {...args} />;

export const Invalid = Template.bind({});
Invalid.args = {
  content:'RM'
};

export const Valid = Template.bind({});
Valid.args = {
  content:'https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?format=png&width=960'
};
