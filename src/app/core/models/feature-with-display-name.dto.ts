import { Feature } from "./feature-request.dto";

export interface FeatureWithDisplayName extends Feature {
  displayName: string;
}
