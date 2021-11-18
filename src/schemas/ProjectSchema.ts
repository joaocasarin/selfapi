import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IProject {
    id?: string;
    name: string;
    description: string;
    app?: string;
    github: string;
    logo: string;
}

const ProjectSchema = new Schema<IProject>({
    id: {
        type: String,
        default: uuidv4,
        required: false,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    app: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

export const Project = model<IProject>('project', ProjectSchema);
