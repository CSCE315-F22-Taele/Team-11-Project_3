[#ftl/]
[#-- @ftlvariable name="recoveryCodes" type="java.util.List<java.lang.String>" --]
[#import "../../../_layouts/admin.ftl" as layout/]
[#import "../../../_utils/button.ftl" as button/]
[#import "../../../_utils/dialog.ftl" as dialog/]
[#import "../../../_utils/helpers.ftl" as helpers/]
[#import "../../../_utils/message.ftl" as message/]
[#import "../../../_utils/properties.ftl" as properties/]
[#import "_macros.ftl" as twoFactorMacros/]

[@dialog.form titleKey="recovery-code-title" action="${request.contextPath}/ajax/user/two-factor/enable" formClass="full" includeFooter=false]
  [@control.hidden name="action" value="complete"/]
  <div class="row">
    <div class="col-xs">
      <fieldset>
        <p> [@message.print key="{description}recovery-codes-1" values=[recoveryCodes?size] /] </p>
      </fieldset>
      <fieldset>
        <div class="d-flex center" style="flex-wrap: wrap;">
          [#list recoveryCodes as code]
          <div class="p-2 mr-2 mb-2 code">${code}</div>
          [/#list]
        </div>
      </fieldset>
      <fieldset>
        <p> [@message.print key="{description}recovery-codes-2"/] </p>
      </fieldset>
    </div>
  </div>
  <footer>
    [@button.formIcon icon="check" color="blue" textKey="done" /]
  </footer>
[/@dialog.form]
