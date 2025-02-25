export class MessageModel {
    id!: number;
    name!: string; // Sender's name
    subject!: string; // Subject of the message
    description!: string; // Description of the message
    contact!: string; // Contact information (email or phone)
    time!: string; // Time the message was sent (format: YYYY-MM-DD HH:mm:ss)
}

