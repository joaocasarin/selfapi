import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface RequestProjectBody {
    name: string;
    description: string;
    stack: string[];
    sourceCode: string;
    livePreview: string;
}

export interface ProjectModel {
    id: string;
    name: string;
    description: string;
    stack: string[];
    sourceCode: string;
    livePreview: string;
}

const ProjectSchema = new Schema<ProjectModel>({
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
    stack: {
        type: [String],
        required: true
    },
    sourceCode: {
        type: String,
        required: true
    },
    livePreview: {
        type: String,
        required: true
    }
});

export const Project = model<ProjectModel>('project', ProjectSchema);
