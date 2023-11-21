import { Pipe, PipeTransform } from "@angular/core";
import { HelperService } from "../services/helper.service";

@Pipe({
    name: "hostname"
})
/**
 * Hostname Pipe
 */
export class HostnamePipe implements PipeTransform {
    /**
     * Transform method
     * @param {string} value Value
     * @returns {string} Hostname
     */
    transform(value: string): string {
        return value ? HelperService.getHostname(value) : "";
    }
}
