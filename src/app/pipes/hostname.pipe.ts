import { Pipe, PipeTransform } from "@angular/core";
import { HelperService } from "../services/helper.service";

@Pipe({
    name: "hostname"
})
export class HostnamePipe implements PipeTransform {
    transform(value: string): string {
        return value ? HelperService.getHostname(value) : "";
    }
}
