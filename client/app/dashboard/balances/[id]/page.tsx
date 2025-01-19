import AccountDetails from "@/components/dashboard/accounts/AccountDetails";

const AccountDetailsPage = async({params}:{params:Promise<{id:string}>}) => {
const id=(await params).id
  return (
    <main className="w-full h-full">
      <AccountDetails id={id}/>
    </main>
  )
};

export default AccountDetailsPage;
