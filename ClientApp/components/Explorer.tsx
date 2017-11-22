import * as React from 'react';
import { render } from 'react-dom';
import { Button } from 'box-ui-elements/lib/components/Button';
import { PlainButton } from 'box-ui-elements/lib/components/Button';
import { PrimaryButton } from 'box-ui-elements/lib/components/Button';
import  DropdownMenu  from 'box-ui-elements/lib/components/DropdownMenu';
import { Menu, MenuItem } from 'box-ui-elements/lib/components/Menu';
import { Header } from 'box-ui-elements/lib/components/Header';
import { EmptyState } from 'box-ui-elements/lib/components/EmptyState';
import { FileIcon } from 'box-ui-elements/lib/components/icons/file/FileIcon';
import LoadingIndicator from 'box-ui-elements/lib/components/LoadingIndicator';


export class Explorer extends React.Component<{}, {}> {
    test1() {
        console.log("test1complete");
        

        fetch("/api/Login/GetBoxFiles/?token=" + sessionStorage.getItem("box_access_token"))
            .then(response => response.json)
            .then(data => {
                console.log(data);
            });
    }
  public render() {
      return (
          <div>
              <Button onClick={this.test1}> Button </Button><br /><br />
              <PlainButton> PlainButton </PlainButton><br /><br />
              <PrimaryButton> PrimaryButton </PrimaryButton><br /><br />
              <DropdownMenu>
                  <Button className='buik-dropdown-menu-example-button' type='button'>
                      DropdownMenu
        </Button>
                  <Menu>
                      <MenuItem /*onClick={ }*/>MenuItem</MenuItem>
                      <MenuItem /*onClick={ }*/>MenuItem</MenuItem>
                  </Menu>
              </DropdownMenu>
             
                  <LoadingIndicator />
                  
              
          </div>
    );
  }

}