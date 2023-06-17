import { NextPage } from "next"
import Dropdown from "../../components/Dropdown"
import Navigation from "../../components/Navigation"
import ButtonComponent from "../../components/Button"
import {Shows} from "../../types/Shows"
import MenuItems from "../../components/MenuItems"
import prisma from "../../lib/prisma"
import { Workshops } from "../../types/Workshops"

type Props = {
    shows: Shows[];
    workshops: Workshops[];
    error: Error;
}
const UploadMedia: NextPage<Props> = ({workshops, shows, error}) => {
    // const MENU_LIST = [
    //     {
    //       name: "Projects",
    //       submenu: [
    //         {
    //             name: "Shows",
    //             submenu: [
    //                 shows.map((show) => (
    //                     {
    //                         name: show.name,
    //                         submenu: [
    //                             {
    //                                 name: "Show Photo",
    //                                 url: `/media/create/projects/shows/${show.showid}/showphoto`,
    //                             }
    //                         ]
    //                     }
    //                 ))
    //             ],
    //         },
    //         {
    //             name: "Workshops",
    //             submenu: [
    //                 workshops.map((workshop) => (
    //                     {
    //                         name: workshop.title,
    //                         submenu: [
    //                             {
    //                                 name: "Workshop Photo",
    //                                 url: `/media/create/projects/workshops/${workshop.workshopid}/workshopphoto`
    //                             }
    //                         ]

    //                     }
    //                 ))
    //             ]
    //         }
    //       ]
          
    //     },        
    //   ];
    return (
        // <div>
        //     {MENU_LIST.map((menu, index) => {
        //         const depthLevel = 0;
        //         return <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        //     })}
        //     <hr />
        //     {/* <ButtonComponent title="click here to return to the admin page" href="/admin" /> */}
        // </div>
        <div>hi</div>
    )
}

export const getServerSideProps = async() => {
    try {
        const shows: Shows[] = await prisma.shows.findMany()
        const workshops: Workshops[] = await prisma.workshops.findMany()
        return {props: {shows: shows, workshops: workshops, error: null}}
    } catch (e) {
        console.error(e)

        return {props: {shows: null,  worshops: null, error: e}}
    }
}

export default UploadMedia