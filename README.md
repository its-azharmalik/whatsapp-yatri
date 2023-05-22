# WhatsApp Yatri
WhastApp Yatri is a GitHub project that aims to provide a hassle-free cab booking experience to its users. With the help of this project, users can easily book cabs directly from their WhatsApp account, without having to install any additional applications or visit any website.

The WhatsApp bot created by this project allows users to enter their pickup location, destination, and other necessary details such as the date and time of travel. The bot then checks for available cabs in the area and provides users with a list of options to choose from. Once a user selects a cab, the bot takes care of the booking process, providing users with confirmation and all the necessary details regarding their ride.

The Namma Yatri app is designed to be user-friendly and intuitive, with a simple and easy-to-use interface. The project is open-source, and developers are encouraged to contribute to the project, add new features, and improve its overall functionality.

Overall, Namma Yatri is a promising project that has the potential to revolutionize the way people book cabs. With its easy-to-use WhatsApp bot and seamless booking process, it has the potential to become a go-to platform for users looking for a hassle-free and convenient way to book cabs.

## Prerequisites

Before you can start using the Twilio API for sending and receiving messages through WhatsApp, you need to complete the following steps:

1) Create a Twilio account: If you don't already have a Twilio account, go to <a href = "https://www.twilio.com/en-us"> Twilio's website</a> and sign up for a free account.

2) Create a Twilio WhatsApp Sandbox: Follow the <a href="https://www.twilio.com/docs/whatsapp/sandbox">Twilio guide</a> to set up a WhatsApp sandbox and receive a Twilio phone number that can be used to send and receive messages.

3) Configure your Twilio account: Once you have set up your Twilio WhatsApp sandbox, configure your Twilio account by providing your Twilio phone number and configuring the messaging service. Follow the Twilio guide to set up your account and messaging service.

4) Install the Twilio library: Install the Twilio library for Python by running the following command in your terminal:

```
npm install twilio
```

This library is required to interact with the Twilio API and send and receive messages through WhatsApp.
> This step can be skipped as twilio will be automatically installed when installing project dependency


Once you have completed these steps, you will be ready to start using the Twilio API to send and receive messages through WhatsApp.

Configure all other enironment variables which are stated below by siging up on different platforms.

> PORT=XXX

> GOOGLE_CREDENTIAL_CLIENT_ID=XXX

> GOOGLE_CREDENTIAL_CLIENT_SECRET=XXX

> GOOGLE_CREDENTIAL_CALLBACK_URL=XXX

> JWT_ACCESS_TOKEN=XXX

> CLOUDINARY_CLOUD_NAME=XXX

> CLOUDINARY_API_KEY=XXX

> CLOUDINARY_API_SECRET=XXX

> DOMAIN=localhost:8000

> NODEMAILER_EMAIL=XXX

> NODEMAILER_PASSWORD=XXX

> BCRYPT_SALT_ROUNDS=XXX

> TWILLIO_SECRET = XXX

> TWILLIO_SID = XXX

> ACCOUNT_SID =XXX

> AUTH_TOKEN =XXX


## Getting Started

Follow the below steps to start using the WhatsApp bot for booking cabs:

1) ***Clone the repository:*** Clone the Namma Yatri GitHub repository to your local machine by running the following command in your terminal:

```
git clone https://github.com/<username>/namma-yatri.git
```

2) ***Set up the environment:*** Install the required dependencies and packages to run the Namma Yatri project by running the following command in your terminal:


```
npm install
```

```
npm run dev
```

3) ***Configure the WhatsApp bot:*** To use the WhatsApp bot, you need to create a WhatsApp account and configure the Twilio API for sending and receiving messages. Follow the instructions provided in the Prerequisite section to set up your WhatsApp bot and Twilio API. Add the Accounnt Ssid and Auth token in the .env file.

4) ***Start booking cabs:*** Once you have completed the above steps, you can start booking cabs through the WhatsApp bot. Simply send a message to the bot with your pickup location, destination, date, and time of travel. The bot will respond with a list of available cabs in the area, and you can select the one that suits your needs. The bot will then take care of the booking process and provide you with confirmation and all necessary details.




## Contributing

Contributions to the Namma Yatri project are welcome! If you would like to contribute, please fork the repository and submit a pull request.

## Authors

- **Azhar Malik** - _Initial work_ -
  [its-azharmalik](https://github.com/its-azharmalik)

- **Utkarsh Jha** - _Initial work_ -
  [Utkarsh-88034](https://github.com/Utkarsh-88034)

See also the list of
[contributors](https://github.com/your/project/contributors) who participated in
this project.

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details


