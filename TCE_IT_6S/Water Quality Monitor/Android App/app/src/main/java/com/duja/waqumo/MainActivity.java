package com.duja.waqumo;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import in.unicodelabs.kdgaugeview.KdGaugeView;

public class MainActivity extends AppCompatActivity {

    DatabaseReference databaseReference;
    private KdGaugeView v1;
    private TextView tv2;
    private TextView tv3;
    private TextView tv4;
    private TextView tv5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        databaseReference = FirebaseDatabase.getInstance().getReference("SixthSemester/IOT-MAD-EDP/WaterQualityMonitor/UserId/");
        v1 = (KdGaugeView) findViewById(R.id.speedMeter);
        tv2 = (TextView) findViewById(R.id.phValue);
        tv3 = (TextView) findViewById(R.id.tempValue);
        tv4 = (TextView) findViewById(R.id.cleanValue);
        tv5 = (TextView) findViewById(R.id.condValue);
        getData();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater mi = getMenuInflater();
        mi.inflate(R.menu.connection_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.ConnectionManagement:
                Intent intent = new Intent(getApplicationContext(), ConnectionActivity.class);
                startActivity(intent);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    private void getData() {
        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                String value1 = String.valueOf(snapshot.child("Level").getValue());
                String value2 = String.valueOf(snapshot.child("Ph").getValue());
                String value3 = String.valueOf(snapshot.child("Temperature").getValue());
                String value4 = String.valueOf(snapshot.child("Purity").getValue());
                String value5 = String.valueOf(snapshot.child("Conductivity").getValue());
                String value6 = String.valueOf(snapshot.child("LevelInPercent").getValue());
                v1.setSpeed(Float.parseFloat(value6));
                tv2.setText(value2);
                tv3.setText(value3.substring(0,2)+" `C");
                tv4.setText(value4+" %");
                tv5.setText(value5+" S");
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(MainActivity.this, "Fail to Get Data", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
