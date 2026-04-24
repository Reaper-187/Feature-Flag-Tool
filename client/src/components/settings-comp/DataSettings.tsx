import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface DataSettingsProps {
  id?: string;
}

export const DataSettings = ({ id }: DataSettingsProps) => {
  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>Data & Privacy</CardTitle>
        <CardDescription>
          Control your data and privacy settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Export Data</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Download all your personal data in JSON format
            </p>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium text-destructive">
              Delete Account
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
