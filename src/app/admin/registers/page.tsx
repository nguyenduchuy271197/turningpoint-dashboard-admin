import {
  PageDescription,
  PageHeader,
  PageHeading,
} from "@/components/page-header";
import RegisterTable from "./_components/register-table";

export default function UsersPage() {
  return (
    <div className="px-4">
      <PageHeader>
        <PageHeading>Registers</PageHeading>
        <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
      </PageHeader>
      <RegisterTable />
    </div>
  );
}
