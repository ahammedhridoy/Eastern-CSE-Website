"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const EventDetailsCard = () => {
  return (
    <div className="">
      <Card>
        <CardMedia
          image="/images/event/b1.jpg"
          title="green iguana"
          className="object-cover h-[300px] md:h-[600px]"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            15 Things To Do After Installing Kali Linux
          </Typography>
          <Typography
            variant="body2"
            className="text-justify text-[var(--gray-color)]"
          >
            Features of Kali Linux: Comprehensive Toolkit: Kali Linux comes with
            a wide selection of pre-installed security tools that cover all
            aspects of penetration testing and ethical hacking, making it a
            one-stop shop for cybersecurity professionals. Open Source & Free:
            Kali Linux is an open-source distribution, so users can change,
            distribute, and contribute to its development under the GNU General
            Public License. Frequent updates: Kali Linux is regularly updated,
            ensuring that security experts have access to the most recent tools
            and technology for assessing and addressing cybersecurity
            vulnerabilities. 15 Things To Do After Installing Kali Linux In this
            section, we will explore the important 15 Things that we should do
            and perform once the installation of the Kali Linux Operating System
            is done. So, perform each of the tasks properly with essential
            command execution. 1. Update and Upgrade: Step 1: Open your terminal
            and run the following command to update and upgrade the Kali System.
            The below command ensures that the package lists are refreshed,
            providing the latest available versions of software packages. It is
            a crucial first step to keep the system up-to-date and secure. 4.
            Configure Network Repositories: After that, you can Ensure the
            correct network repository configuration using the following
            command. Once the initial setup is complete, it is imperative to
            validate and optimize the network repository configuration. This
            verification ensures your system fetches software packages from
            accurate and current sources. Execute the following command to
            safeguard this configuration. This crucial step guarantees that your
            system remains synchronized with the latest software releases and
            security patches. sudo cp /etc/apt/sources.list
            /etc/apt/sources.list.backup sudo echo "deb
            http://http.kali.org/kali kali-rolling main non-free contrib" | sudo
            tee /etc/apt/sources.list
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailsCard;
