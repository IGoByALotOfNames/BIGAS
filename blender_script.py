import bpy
import math
import mathutils
import json
import os

# ======================= CONFIGURATION =======================

# Set the frame range you want to record
START_FRAME = 1
END_FRAME = 61

# Set the frame skip rate.
# 0 = record every frame (1, 2, 3, ...)
# 1 = record every other frame (1, 3, 5, ...)
# 2 = record every third frame (1, 4, 7, ...)
SKIP_FRAME = 2

# The list of object names you want to track
OBJECT_NAMES = [
    "Head", 
    "Torso1",
    "Torso2",
    "Torso3",
    "Torso4",
    "Torso5",
    "Torso6",
    "LArm1",
    "LArm2",
    "LArm3",
    "RArm1",
    "RArm2",
    "RArm3",
    "LLeg1",
    "LLeg2",
    "LLeg3",
    "RLeg1",
    "RLeg2",
    "RLeg3",
]
# =============================================================


def get_object_world_transform(obj_name, depsgraph):
    """
    Safely gets an object by name and returns its evaluated world location and rotation.
    """
    obj = bpy.data.objects.get(obj_name)
    if not obj:
        return None, None
        
    evaluated_obj = obj.evaluated_get(depsgraph)
    world_matrix = evaluated_obj.matrix_world
    location, rotation_quat, scale = world_matrix.decompose()
    return location, rotation_quat


def main():
    """
    Main function to execute the recording and file saving process.
    """
    scene = bpy.context.scene
    initial_transforms = {}
    animation_data = []

    # --- Step 1: Record the initial state of all objects at Frame 0 ---
    print("Recording initial transforms at Frame 0...")
    scene.frame_set(0)
    depsgraph_initial = bpy.context.evaluated_depsgraph_get()

    for name in OBJECT_NAMES:
        loc, rot = get_object_world_transform(name, depsgraph_initial)
        if loc and rot:
            initial_transforms[name] = {'location': loc, 'rotation': rot}
        else:
            print(f"Warning: Initial object '{name}' not found. It will be skipped.")
            
    if not initial_transforms:
        print("Error: No valid objects found. Aborting script.")
        return

    # --- Step 2: Iterate through frames, calculate differences, and record ---
    print(f"Processing frames from {START_FRAME} to {END_FRAME}...")
    
    for frame in range(START_FRAME, END_FRAME + 1, SKIP_FRAME + 1):
        scene.frame_set(frame)
        depsgraph_current = bpy.context.evaluated_depsgraph_get()
        
        frame_data = []
        
        for name in OBJECT_NAMES:
            if name not in initial_transforms:
                continue

            current_loc, current_rot = get_object_world_transform(name, depsgraph_current)
            initial_loc = initial_transforms[name]['location']
            initial_rot = initial_transforms[name]['rotation']
            
            loc_diff = current_loc - initial_loc
            rot_diff_quat = current_rot @ initial_rot.inverted()
            rot_diff_euler = rot_diff_quat.to_euler('XYZ')

            loc_diff_rounded = [round(coord, 2) for coord in loc_diff]
            rot_diff_rounded = [round(math.degrees(angle), 2) for angle in rot_diff_euler]

            object_data_for_frame = [loc_diff_rounded,rot_diff_rounded]
            frame_data.append(object_data_for_frame)
            
        animation_data.append(frame_data)
        print(f"  - Recorded data for frame {frame}")

    # --- Step 3: Save the final data to a JSON file with compact formatting ---
    blend_file_path = bpy.data.filepath
    directory = os.path.dirname(blend_file_path) if blend_file_path else ""
    output_filepath ="D:/animations/animation_data.json"

    print(f"\nSaving data to: {output_filepath}")

    try:
        with open(output_filepath, 'w') as f:
            f.write('[\n')
            for i, frame_data in enumerate(animation_data):
                # Use separators=(',', ':') for the most compact JSON representation
                line = json.dumps(frame_data, separators=(',', ':'))
                f.write(line)
                
                # Add a comma and newline for all lines except the last one
                if i < len(animation_data) - 1:
                    f.write(',\n')
            f.write('\n]')
        print("File saved successfully.")
    except Exception as e:
        print(f"Error saving file: {e}")


# --- Run the main function ---
if __name__ == "__main__":
    main()
