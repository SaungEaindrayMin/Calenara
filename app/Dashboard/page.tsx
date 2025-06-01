import requireUser from "../lib/requireUser";

export default async function Dashboard () {

    const session = await requireUser();


    return(
        <div>
            hello world, here is my dashboard
        </div>
    );
}