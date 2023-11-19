export const dynamic = "force-dynamic"; // defaults to force-static

export type Classes = {
    INTAKE: string;
    MODID: string;
    MODULE_NAME: string;
    DAY: string;
    LOCATION: string;
    ROOM: string;
    LECTID: string;
    NAME: string;
    SAMACCOUNTNAME: string;
    DATESTAMP: string;
    DATESTAMP_ISO: string;
    TIME_FROM: string;
    TIME_TO: string;
    TIME_FROM_ISO: string;
    TIME_TO_ISO: string;
    GROUPING: string;
    CLASS_CODE: string;
    COLOR: string;
};

export async function GET(req: Request) {
    const res = await fetch("https://s3-ap-southeast-1.amazonaws.com/open-ws/weektimetable", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data: Classes[] = await res.json();

    const myIntake = data.filter((item) => item.INTAKE === "APU2F2311SE");

    return Response.json(myIntake);
}
