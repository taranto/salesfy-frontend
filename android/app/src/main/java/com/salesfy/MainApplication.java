package com.salesfy;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.bugsnag.BugsnagReactNative;
import com.meedan.ShareMenuPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.filepicker.FilePickerPackage;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication, ShareApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

     

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LinearGradientPackage(),
            new ReactNativeDocumentPicker(),
            BugsnagReactNative.getPackage(),
            new ShareMenuPackage(),
            new RNGoogleSigninPackage(),
            new RandomBytesPackage(),
            new FBSDKPackage(mCallbackManager),
            new PickerPackage(),
            new RNCWebViewPackage(),
            new RNDeviceInfo(),
            new RNSensitiveInfoPackage(),
            new VectorIconsPackage(),
            new RNSharePackage(),
            new FastImageViewPackage(),
            new FilePickerPackage(),
            new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public String getFileProviderAuthority() {
        return "com.salesfy.provider";
  }

  @Override
  public void onCreate() {
    super.onCreate();
    BugsnagReactNative.start(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
