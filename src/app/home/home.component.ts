import { ItemEventData } from "tns-core-modules/ui/list-view"
import { Component, OnInit } from "@angular/core";
import * as camera from "@nativescript/camera";
import { OCR, RetrieveTextResult } from "nativescript-ocr";
import { Image } from "tns-core-modules/ui/image";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    
    private ocr: OCR;

    listPickerCountries: Array<string> = ["Australia", "Belgium", "Bulgaria", "Canada", "Switzerland",
        "China", "Czech Republic", "Germany", "Spain", "Ethiopia", "Croatia", "Hungary",
        "Italy", "Jamaica", "Romania", "Russia", "United States"];
    selectedListPickerIndex: number = 0;

    htmlString: string = "<div><h1>HtmlView demo</h1><h2>in NativeScript App</h2></div>";

    Category: { Item: string, Amount: string, Total: string}[] = [
        { Item: "Category", Amount: "Amount", Total: "Total" },
        { Item: "Lunch", Amount: "500", Total: "" },
        { Item: "Transport", Amount: "150", Total: "" },
        { Item: "Shirt", Amount: "600", Total: "" },
        { Item: "Electronics", Amount: "3000", Total: "" },
        { Item: "Coffee", Amount: "100", Total: "" },
        { Item: "Shoes", Amount: "500", Total: "" },
        { Item: "Petrol", Amount: "500", Total: "" },
        { Item: "Noodles", Amount: "150", Total: "" },
        { Item: "Grocery", Amount: "2000", Total: "15000" },
    ];

    constructor() {
        this.ocr = new OCR();
    }

    ngOnInit(): void {
    }
    
    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }

    navigateAdd(){

        if(camera.isAvailable) {
        camera.requestPermissions().then(
            function success() {
                camera.takePicture().
                then((imageAsset) => {
                    console.log("Result is an image asset instance");
                    var img = new Image();
                    img.src = imageAsset;
                    this.ocr.retrieveText({
                        image: img,
                        onProgress: (percentage: number ) => {
                            console.log(`Decoding progress: ${percentage}%`);
                        }
                    }).then((result: RetrieveTextResult) => {
                        
                        console.log(`Result: ${result.text}`);
                        
                    }, (error: string) => {
                        console.log(`Error: `,error);
                    })
                }).catch((err) => {
                    console.log("Error -> " + err.message);
                });
            }, 
            function failure() {

        });
        } else {
            console.log("Camera Not Available!!");
        }
    }
}
