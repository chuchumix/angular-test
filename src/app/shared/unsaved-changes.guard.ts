import { CanDeactivateFn } from "@angular/router";

export interface HasUnsavedChanges{
    hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = 
    (component) => {
        if(component.hasUnsavedChanges()){
            return confirm('¿Desea descartar los cambios?');
        }
    return true;
};